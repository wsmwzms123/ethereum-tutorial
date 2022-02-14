const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy();
  await waveContract.deployed();
  console.log("contract deployed to", waveContract.address);
  console.log("contract deployed by", owner.address);

  let waveCount = await waveContract.getTotalWaves();

  let waveTxn = await waveContract.connect(randomPerson).wave()
  await waveTxn.wait();
  waveCount = await waveContract.getTotalWaves(); 
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

runMain();