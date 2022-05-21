
const hre=require('hardhat')

const main=async()=>{

    try{

        const LendingToken= await hre.ethers.getContractFactory("LendingToken")
        const lendingtoken= await LendingToken.deploy()
        await lendingtoken.deployed()

        const Lending= await hre.ethers.getContractFactory("Lending")
        const lending= await Lending.deploy()

        await lending.deployed()

        console.log("your lending contract address is :", lendingtoken.address)
        console.log("your lending contract address is :", lending.address)
        process.emit(0)

    }catch(error){

        console.log(error)
        process.exit(1)

    }

}

main()