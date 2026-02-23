import Bracketsmodel from "../models/Bracketsmodel.js";
import Registrations from "../models/Registrations.js";
import Tournamentmodel from "../models/Tournamentmodel.js";

export const CreateBrackets = async (req, res) => {
  try {
    const { roundNumber, bracketType = "winners" } = req.body;
    const { tournamentId } = req.params;

    if (!tournamentId || !roundNumber) {
      return res.status(400).json({
        success: false,
        message: "tournamentId and roundNumber are required"
      });
    }

    // 1️⃣ Get players
    let players = [];

    // Force initialization from Registrations if it's Round 1 (Start of Tournament)
    if (roundNumber === 1) {
      players = await Registrations.find({
        tournamentId,
        paymentStatus: "verified"
      });
    }
    // Otherwise, standard progression logic
    else if (bracketType === "winners") {
      const previousWinners = await Bracketsmodel.find({
        tournamentId,
        roundNumber: roundNumber - 1,
        bracketType: "winners",
        status: "completed"
      }).sort({ matchIndex: 1 }).populate("winner");

      players = previousWinners.map(match => match.winner).filter(Boolean);
    } else {
      // Losers Bracket Logic (Round 2+)
      const previousLbWinners = await Bracketsmodel.find({
        tournamentId,
        roundNumber: roundNumber - 1,
        bracketType: "losers",
        status: "completed"
      }).sort({ matchIndex: 1 }).populate("winner");

      players = previousLbWinners.map(match => match.winner).filter(Boolean);
    }

    // Filter out nulls
    players = players.filter(p => p != null);

    const tournament = await Tournamentmodel.findById(tournamentId);

    let isGrandFinal = false;

    if (tournament && tournament.tournamentType === "double" && players.length === 1) {
      let wbWinner = null;
      let lbWinner = null;

      if (bracketType === "winners") {
        wbWinner = players[0];
        const lbResults = await Bracketsmodel.find({
          tournamentId,
          bracketType: "losers",
          status: "completed"
        }).sort({ roundNumber: -1, matchIndex: 1 }).populate("winner");
        if (lbResults.length > 0) lbWinner = lbResults[0].winner;
      } else {
        lbWinner = players[0];
        const wbResults = await Bracketsmodel.find({
          tournamentId,
          bracketType: "winners",
          status: "completed"
        }).sort({ roundNumber: -1, matchIndex: 1 }).populate("winner");
        if (wbResults.length > 0) wbWinner = wbResults[0].winner;
      }

      if (wbWinner && lbWinner) {
        const gf = await Bracketsmodel.findOne({ tournamentId, bracketType: "grand_final" });
        if (!gf) {
          players = [wbWinner, lbWinner];
          isGrandFinal = true;
        } else {
          return res.status(200).json({
            success: true,
            message: "Grand Final already created",
            data: gf.winner || gf,
          });
        }
      } else {
        return res.status(200).json({
          success: true,
          message: `${bracketType === "winners" ? "Winners" : "Losers"} Bracket completed. Waiting for the other bracket.`,
          data: players[0],
        });
      }
    } else if (players.length === 1 && bracketType === "winners") {
      return res.status(200).json({
        success: true,
        message: "Winner is declared",
        data: players[0],
      });
    }

    const isMajorRound = (bracketType === "losers" && roundNumber % 2 === 0);

    if (players.length < 1 || (!isMajorRound && players.length < 2)) {
      return res.status(400).json({
        success: false,
        message: "Not enough players to create brackets for this round/bracket type"
      });
    }

    // 2️⃣ Create brackets
    const brackets = [];
    const actualBracketType = (isGrandFinal || bracketType === "grand_final") ? "grand_final" : bracketType;

    // Calculate final round number
    let finalRoundNumber = roundNumber;
    if (isGrandFinal) {
      const lastMatch = await Bracketsmodel.findOne({ tournamentId }).sort({ roundNumber: -1 });
      finalRoundNumber = Math.max(roundNumber, (lastMatch?.roundNumber || 0) + 1);
    }

    // --- FULL GENERATION LOGIC (Pre-seed all rounds if roundNumber is 1) ---
    if (roundNumber === 1) {
      // 1. Create Round 1 Matches
      let matchCount = Math.ceil(players.length / 2);
      for (let i = 0; i < players.length; i += 2) {
        const match = {
          tournamentId,
          roundNumber: 1,
          bracketType: "winners",
          matchIndex: i / 2,
          teamA: players[i]._id || players[i],
          teamB: players[i + 1] ? (players[i + 1]._id || players[i + 1]) : null,
        };
        // Auto-complete BYEs in R1
        if (!match.teamB) {
          match.winner = match.teamA;
          match.status = "completed";
        }
        brackets.push(match);
      }

      // 2. Generate future Winners rounds
      let currentRoundMatchCount = matchCount;
      let currentRound = 1;
      while (currentRoundMatchCount > 1) {
        currentRound++;
        currentRoundMatchCount = Math.ceil(currentRoundMatchCount / 2);
        for (let i = 0; i < currentRoundMatchCount; i++) {
          brackets.push({
            tournamentId,
            roundNumber: currentRound,
            bracketType: "winners",
            matchIndex: i,
            teamA: null,
            teamB: null
          });
        }
      }

      // 3. Generate Losers Bracket (Always Enforced for this Logic)
      const finalWBRound = currentRound;
      // Removed check: if (tournament && tournament.tournamentType === "double")

      const totalLbRounds = (finalWBRound - 1) * 2;
      let lbMatchCount = Math.ceil(matchCount / 2); // Start with half of WB R1 matches

      for (let r = 1; r <= totalLbRounds; r++) {
        const isMajor = (r % 2 === 0);
        if (r > 1 && !isMajor) lbMatchCount = Math.ceil(lbMatchCount / 2);

        for (let i = 0; i < lbMatchCount; i++) {
          brackets.push({
            tournamentId,
            roundNumber: r,
            bracketType: "losers",
            matchIndex: i,
            teamA: null,
            teamB: null
          });
        }
      }

      // 4. Generate Grand Final (Always Enforced for this Logic)
      brackets.push({
        tournamentId,
        roundNumber: Math.max(finalWBRound, totalLbRounds) + 1,
        bracketType: "grand_final",
        matchIndex: 0,
        teamA: null,
        teamB: null
      });

      const createdBrackets = await Bracketsmodel.insertMany(brackets);
      return res.status(201).json({
        success: true,
        message: "Full tournament tree generated successfully",
        data: createdBrackets
      });
    }

    // --- FALLBACK: Manual/Per-round Generation ---
    if (isMajorRound) {
      for (let i = 0; i < players.length; i++) {
        brackets.push({
          tournamentId,
          roundNumber: finalRoundNumber,
          bracketType: actualBracketType,
          matchIndex: i,
          teamA: players[i]._id || players[i],
          teamB: null,
        });
      }
    } else {
      for (let i = 0; i < players.length; i += 2) {
        const match = {
          tournamentId,
          roundNumber: finalRoundNumber,
          bracketType: actualBracketType,
          matchIndex: i / 2,
          teamA: players[i]._id || players[i],
          teamB: players[i + 1] ? (players[i + 1]._id || players[i + 1]) : null,
        };
        if (!match.teamB && actualBracketType === "winners") {
          match.winner = match.teamA;
          match.status = "completed";
        }
        brackets.push(match);
      }
    }

    const createdBrackets = await Bracketsmodel.insertMany(brackets);
    res.status(201).json({
      success: true,
      message: `${actualBracketType} Round ${finalRoundNumber} brackets created`,
      data: createdBrackets
    });

  } catch (error) {
    console.error("Create brackets error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

export let Gettherounded = async (req, res) => {
  try {
    let { tournamentid, roundno } = req.params;
    let { bracketType = "winners" } = req.query;

    const query = {
      tournamentId: tournamentid,
      roundNumber: roundno,
      bracketType: bracketType
    };

    const brackets = await Bracketsmodel.find(query)
      .populate("teamA", "gamingName")
      .populate("teamB", "gamingName")
      .populate("winner", "gamingName");

    res.status(200).json({
      success: true,
      data: brackets
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error fetching rounded brackets" });
  }
}

export const updateMatchWinner = async (req, res) => {
  try {
    const { matchId } = req.params;
    const { winnerId, teamAScore, teamBScore } = req.body;

    if (!winnerId) {
      return res.status(400).json({ success: false, message: "winnerId is required" });
    }

    const match = await Bracketsmodel.findById(matchId);
    if (!match) {
      return res.status(404).json({ success: false, message: "Match not found" });
    }

    if (match.teamA && match.teamB && match.teamA.toString() !== winnerId && match.teamB.toString() !== winnerId) {
      return res.status(400).json({ success: false, message: "Winner must be one of the teams" });
    }

    // 1️⃣ UPDATE CURRENT MATCH STATUS
    match.winner = winnerId;
    match.status = "completed";

    // Save Scores if provided
    if (teamAScore !== undefined) match.teamAScore = teamAScore;
    if (teamBScore !== undefined) match.teamBScore = teamBScore;

    await match.save();

    const tournament = await Tournamentmodel.findById(match.tournamentId);

    // 2️⃣ PROGRESSION LOGIC (Rule 3 & 4)
    // "Winner stays in bracket, Loser actions depend on bracket"

    // --- WINNER ACTIONS ---
    // Winner always advances to next round in SAME bracket (Rule 4)
    let nextPosition = match.matchIndex % 2 === 0 ? 'teamA' : 'teamB';

    if (match.bracketType === "winners") {
      const nextMatch = await Bracketsmodel.findOne({
        tournamentId: match.tournamentId,
        roundNumber: match.roundNumber + 1,
        bracketType: "winners",
        matchIndex: Math.floor(match.matchIndex / 2)
      });
      if (nextMatch) {
        nextMatch[nextPosition] = winnerId;
        await nextMatch.save();
      } else {
        // Rule 7: Finalist from WB goes to Grand Final Team A
        const gfMatch = await Bracketsmodel.findOne({
          tournamentId: match.tournamentId,
          bracketType: "grand_final",
          matchIndex: 0
        });
        if (gfMatch) {
          gfMatch.teamA = winnerId;
          await gfMatch.save();
        }
      }
    } else if (match.bracketType === "losers") {
      // Losers Bracket Winners advance in Losers Bracket
      const isMinorRound = (match.roundNumber % 2 !== 0);
      let targetRound = match.roundNumber + 1;
      let targetIndex = isMinorRound ? match.matchIndex : Math.floor(match.matchIndex / 2);
      let targetPosition = isMinorRound ? 'teamA' : (match.matchIndex % 2 === 0 ? 'teamA' : 'teamB');

      const nextMatch = await Bracketsmodel.findOne({
        tournamentId: match.tournamentId,
        roundNumber: targetRound,
        bracketType: "losers",
        matchIndex: targetIndex
      });
      if (nextMatch) {
        nextMatch[targetPosition] = winnerId;
        await nextMatch.save();
      } else {
        // Rule 7: Finalist from LB goes to Grand Final Team B
        const gfMatch = await Bracketsmodel.findOne({
          tournamentId: match.tournamentId,
          bracketType: "grand_final",
          matchIndex: 0
        });
        if (gfMatch) {
          gfMatch.teamB = winnerId;
          await gfMatch.save();
        }
      }
    } else if (match.bracketType === "grand_final") {
      // Rule 7: End Game
      // Winner of this match is Tournament Champion.
      // No progression needed. 
    }

    // --- LOSER ACTIONS (Rule 3 & 6) ---
    // "Did this player lose?"
    const loserId = (match.teamA && match.teamA.toString() === winnerId) ? match.teamB : match.teamA;

    // Always enforce Double Elimination Logic (2 Losses = Out)
    if (loserId) {
      if (match.bracketType === "winners") {
        // Rule 3: First Loss? -> Move to Loser Bracket (Rule 6: "Mixing")

        // Calculate Drop Target (Rule 6: "Plays against players waiting there")
        let targetLbRound;
        let targetMatchIndex;
        let position;

        if (match.roundNumber === 1) {
          // WB R1 Losers -> LB R1
          targetLbRound = 1;
          targetMatchIndex = Math.floor(match.matchIndex / 2);
          position = match.matchIndex % 2 === 0 ? 'teamA' : 'teamB';
        } else {
          // WB R(N) Losers -> LB R(2N-2)
          targetLbRound = 2 * match.roundNumber - 2;
          targetMatchIndex = match.matchIndex;
          position = 'teamB'; // Mixing: WB Losers usually take slot B to play against LB Winners in slot A
        }

        const lbMatch = await Bracketsmodel.findOne({
          tournamentId: match.tournamentId,
          roundNumber: targetLbRound,
          bracketType: "losers",
          matchIndex: targetMatchIndex
        });

        if (lbMatch) {
          lbMatch[position] = loserId;
          await lbMatch.save();
        }
      } else if (match.bracketType === "losers") {
        // Rule 3: Second Loss? -> Remove him from tournament
        // (No action needed, player simply does not advance)
      } else if (match.bracketType === "grand_final") {
        // Rule 7: Second Place
        // (No action needed)
      }
    }

    res.status(200).json({
      success: true,
      message: "Winner updated successfully",
      data: match
    });

  } catch (error) {
    console.error("Update winner error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

export const GetAllBrackets = async (req, res) => {
  try {
    const { tournamentId } = req.params;
    const brackets = await Bracketsmodel.find({ tournamentId })
      .populate("teamA", "gamingName")
      .populate("teamB", "gamingName")
      .populate("winner", "gamingName")
      .sort({ roundNumber: 1, matchIndex: 1 });

    res.status(200).json({
      success: true,
      data: brackets
    });
  } catch (error) {
    console.error("GetAllBrackets error:", error);
    res.status(500).json({ success: false, message: "Error fetching all brackets" });
  }
};