module lottery_address::lottery {

    use std::vector;
    use std::signer;
    use aptos_framework::coin::{Self, Coin};
    use aptos_framework::aptos_coin::AptosCoin;
    use aptos_framework::randomness;
    use aptos_framework::timestamp;

    // Error codes
    const ENO_LOTTERY: u64 = 1;
    const ELOTTERY_ALREADY_EXISTS: u64 = 2;
    const ELOTTERY_ALREADY_DRAWN: u64 = 3;
    const ELOTTERY_NOT_DRAWN: u64 = 4;
    const EINSUFFICIENT_BALANCE: u64 = 5;
    const ENO_PARTICIPANTS: u64 = 6;

    // Struct to store the lottery details
    struct Lottery has key {
        participants: vector<address>,
        winner: address,
        prize: Coin<AptosCoin>,
        ticket_price: u64,
        is_drawn: bool,
        start_time: u64,
        end_time: u64,
    }

    // Initialize the lottery
    public entry fun initialize(admin: &signer, ticket_price: u64, duration: u64) {
        let admin_addr = signer::address_of(admin);
        assert!(!exists<Lottery>(admin_addr), ELOTTERY_ALREADY_EXISTS);

        let current_time = timestamp::now_seconds();
        let lottery = Lottery {
            participants: vector::empty(),
            winner: @0x0,
            prize: coin::zero<AptosCoin>(),
            ticket_price,
            is_drawn: false,
            start_time: current_time,
            end_time: current_time + duration,
        };
        move_to(admin, lottery);
    }

    // Buy a lottery ticket
    public entry fun buy_ticket(buyer: &signer, admin_addr: address) acquires Lottery {
        let lottery = borrow_global_mut<Lottery>(admin_addr);
        assert!(!lottery.is_drawn, ELOTTERY_ALREADY_DRAWN);
        assert!(timestamp::now_seconds() < lottery.end_time, ELOTTERY_ALREADY_DRAWN);

        let payment = coin::withdraw<AptosCoin>(buyer, lottery.ticket_price);
        coin::merge(&mut lottery.prize, payment);

        let buyer_addr = signer::address_of(buyer);
        vector::push_back(&mut lottery.participants, buyer_addr);
    }

    // Draw the lottery winner
    #[randomness]
    public(friend) entry fun draw_winner(admin: &signer) acquires Lottery {
        let admin_addr = signer::address_of(admin);
        let lottery = borrow_global_mut<Lottery>(admin_addr);
        
        assert!(!lottery.is_drawn, ELOTTERY_ALREADY_DRAWN);
        assert!(timestamp::now_seconds() >= lottery.end_time, ELOTTERY_NOT_DRAWN);
        assert!(!vector::is_empty(&lottery.participants), ENO_PARTICIPANTS);

        let participants_count = vector::length(&lottery.participants);
        let winner_index = randomness::u64_range(0, participants_count);
        lottery.winner = *vector::borrow(&lottery.participants, winner_index);
        lottery.is_drawn = true;
    }

    // Claim the prize (can only be called by the winner)
    public entry fun claim_prize(winner: &signer, admin_addr: address) acquires Lottery {
        let lottery = borrow_global_mut<Lottery>(admin_addr);
        assert!(lottery.is_drawn, ELOTTERY_NOT_DRAWN);
        assert!(signer::address_of(winner) == lottery.winner, ENO_LOTTERY);

        let prize = coin::extract_all(&mut lottery.prize);
        coin::deposit(signer::address_of(winner), prize);
    }

    // View functions
    #[view]
    public fun get_ticket_price(admin_addr: address): u64 acquires Lottery {
        borrow_global<Lottery>(admin_addr).ticket_price
    }

    #[view]
    public fun get_prize_amount(admin_addr: address): u64 acquires Lottery {
        coin::value(&borrow_global<Lottery>(admin_addr).prize)
    }

    #[view]
    public fun get_participants_count(admin_addr: address): u64 acquires Lottery {
        vector::length(&borrow_global<Lottery>(admin_addr).participants)
    }

    #[view]
    public fun is_lottery_drawn(admin_addr: address): bool acquires Lottery {
        borrow_global<Lottery>(admin_addr).is_drawn
    }

    #[view]
    public fun get_winner(admin_addr: address): address acquires Lottery {
        let lottery = borrow_global<Lottery>(admin_addr);
        assert!(lottery.is_drawn, ELOTTERY_NOT_DRAWN);
        lottery.winner
    }
}