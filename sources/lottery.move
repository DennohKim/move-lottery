module lottery_address::lottery {

    use std::vector;
    use std::account;
    use std::signer;
    use aptos_framework::coin::{Self, Coin};
    use aptos_framework::event;
    use aptos_framework::randomness;

    // Error codes
    const NOT_OWNER: u64 = 101;
    const LOTTERY_NOT_INITIALIZED: u64 = 102;
    const LOTTERY_ALREADY_INITIALIZED: u64 = 103;

    // Struct to store the lottery details
    struct Lottery has key, store {
        participants: vector<address>,
        winner: address,
        prize: u64,
        ticket_price: u64
    }

    public fun is_owner(addr: address) {
        assert!(addr == @lottery_address, 101);
    }

    public fun Is_initialized(addr: address) {
        assert!(exists<Lottery>(addr), 102);
    }

    public fun uninitialized(addr: address) {
        assert!(!exists<Lottery>(addr), 103);
    }

    public fun initialize(acc: &signer) {
        let addr = signer::address_of(acc);

        is_owner(addr);
        uninitialized(addr);

        let lottery = Lottery {
            participants: vector::empty<address>(),
            winner: @0x0,
            prize: 0,
            ticket_price: 1000
        };
        move_to(acc, lottery);
    }

    public entry fun place_bet(from: &signer, to_address: address) acquires Lottery {

    }

    public entry fun draw_winner(acc: &signer) acquires Lottery {
        // Check if the caller is the owner
        // Use the randomness module to generate a random number
    }
}