Truffle : 5.0.6
Solidity: 0.5.0
Openzapplin : 2.5.0


1. start Ganache
2. Create Private network on metamask
    Unlock metamask
    in network list select custom RPC  
    Fill the details according to Ganache
    Import account here from ganache using private key.
3. Inside project folder open  command prompt
    1. Migrate contract(back-end) --> truffle migrate
    2. open another cmd inside project(front-end) --> cd ./clinet -->npm start
4. On browser connect the imported account.
#################################################################################################
Contract covers:
1. Minting
2. KYC Listing
3. Pausable
4. Capped
5. Timed
6. Buying & transfering of tokens in exchange of ethers(wei)
#################################################################################################
Imported account 0 from Ganache is the admin account nd performs admin function
All other accounts imported act as investor account nd performs investor function

Admin Function:
1. KYC listing
2. Pausing ICO
3. Views balance
Investor Function: 
1. Buying transfering of tokens provided KYC completed/ICO is not out of Time/ Paused
2. Views transaction logs

    
