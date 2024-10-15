# Move Lottery

As part of Code collision Hackathon and Encode's Aptos bootcamp, the team (Dennis, Aashish and Akshar) worked on the project: Aptos Lottery. This project implements a decentralized lottery system on the Aptos blockchain using the Move programming language. The smart contract allows users to participate in a lottery by buying tickets with AptosCoin, and uses on-chain randomness to select a winner.

## Key Features

1. **Ticket Purchase**: Users can buy lottery tickets using AptosCoin.
2. **Random Winner Selection and Payout**: Utilizes Aptos' on-chain randomness module for fair winner selection and pays out the prize to the winner in same transaction.
3. **View Functions**: Provides functions to check lottery status, prize amount, and participant count.

## Technology Stack

- Blockchain: Aptos
- Smart Contract: Move
- Frontend: Next.js, React, TypeScript
- Styling: Tailwind CSS
- State Management: React Query
- Wallet Integration: Aptos Wallet Adapter

## Prerequisites

- Node.js (v14 or later)
- Yarn or npm
- Aptos CLI (for contract deployment)
- An Aptos wallet (e.g., Petra, Martian)

## Setup and Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/aptos-lottery.git
   cd aptos-lottery
   ```

2. Install dependencies:
   ```
   cd frontend
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the `frontend` directory and add the following:
   ```
   NEXT_PUBLIC_APP_NETWORK=testnet
   NEXT_PUBLIC_MODULE_ADDRESS=your_module_address
   NEXT_PUBLIC_ADMIN_ADDRESS=your_admin_address
   ```

4. Start the development server:
   ```
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Smart Contract Deployment

1. Navigate to the `move` directory.
2. Update the `Move.toml` file with your account address.
3. Compile and deploy the contract using Aptos CLI:
   ```
   aptos move compile
   aptos move publish
   ```

## Usage

1. Connect your Aptos wallet to the application.
2. As an admin, create new lotteries with specified durations.
3. Users can buy tickets for active lotteries.
4. When a lottery ends, the admin can draw a winner.
5. Winners are automatically credited with the prize amount.

## Project Structure

- `move/`: Contains the Move smart contract
- `frontend/`: Next.js frontend application
  - `src/components/`: React components
  - `src/view-functions/`: Functions to interact with the smart contract
  - `src/entry-functions/`: Functions to call smart contract entry points
  - `src/constants/`: Configuration constants
  - `src/utils/`: Utility functions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

