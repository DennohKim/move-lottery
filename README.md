# Lottery Psuedocode

- Initialize lottery 
    - define structure to store participants, prize, winner
    - initialize lottery with a minimum ticket prize

- Buy ticket
    - users can by tickets by sending Aptos coins to the lottery contract
    - add user's address to the participants list and increase the total prize

- Draw winner
    - ensure lottery has at least three participants
    - use aptos on-chain randomness modulte to select a winner from the participants list
    - transfer the total prize to the winner's address

- End lottery
    - mark lottery as ended


