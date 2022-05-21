const {expect}=require('chai');
const { ethers } = require('hardhat');
const hre= require('hardhat')

describe('Lending', ()=>{

    let admin,address1, address2, lending, lendingToken;

    beforeEach( async()=>{

            [admin,address1,address2]= await ethers.getSigners()
            const Token= await hre.ethers.getContractFactory("LendingToken")
             lendingToken= await Token.deploy()
             await lendingToken.deployed()
             console.log('your lending token adderess is : ',lendingToken.address)

        })

    beforeEach(async()=>{
        const Lending= await hre.ethers.getContractFactory("Lending")
        lending= await Lending.deploy()
        await lending.deployed()

        console.log(`this is the lending contract address : `,lending.address)

    })

        it ('should check the balance of the owner', async()=>{

            const balance= await lendingToken.balanceOf(admin.address)
            expect(balance).to.equal("1000000")
            console.log(`the owner's balance is : ${balance} tokens`)

            await lendingToken.transfer(address1.address,'100000')
            const bal1= await lendingToken.balanceOf(admin.address)
            const bal2= await lendingToken.balanceOf(address1.address)
       
            expect(bal1).to.equal("900000" )
            console.log(`the owner's balance is : ${bal1}`)
            expect(bal2).to.equal("100000" )
            console.log(`the user1 balance is : ${bal2}`)
         })

         it ('It will do a deposit of token to lending contract', async()=>{
            await lendingToken.approve(lending.address,'10000')
            await lending.deposit(lendingToken.address,'1000')
                          
            const balance= await lendingToken.balanceOf(lending.address)
            expect(balance).to.equal("1000")

            console.log(`the owner of this contract has sent ${balance} tokens to the lending contract`)
         })

         it ('another user has to do a deposit of tokens',async()=>{

            await lendingToken.transfer(address1.address,'100000')
            await  lendingToken.connect(address1).approve(lending.address,"20")
            await lendingToken.connect(address1).transfer(lending.address,'15')
            
            const balance= await lendingToken.balanceOf(lending.address)
            expect(balance).to.equal("15")
            console.log(`the address 1 has sent ${balance} tokens to the lending contract`)
         })



})