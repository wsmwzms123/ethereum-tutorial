const main = async () => {
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy();
  await waveContract.deployed();
  console.log("contract deployed to", waveContract.address);

  let waveCount = await waveContract.getTotalWaves();
  console.log(waveCount);

  let waveTxn = await waveContract.wave("孙子，爷爷来了")
  await waveTxn.wait();

  const [owner, randomPerson] = await hre.ethers.getSigners();
  waveTxn = await waveContract.connect(randomPerson).wave("孙子，爷爷又来了");
  await waveTxn.wait();

  let allWaves = await waveContract.getAllWaves();
  console.log(allWaves);
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