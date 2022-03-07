const main = async () => {
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1")
  });
  console.log("parseEther(\"0.1\") equals:", hre.ethers.utils.parseEther("0.1"));
  await waveContract.deployed();
  console.log("contract deployed to", waveContract.address);

  let contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  );

  console.log(
    "contract origin balance:",
    contractBalance
  )

  console.log(
    "contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  )
  let waveTxn;
  waveTxn = await waveContract.wave("孙子，爷爷来了")
  await waveTxn.wait();

  waveTxn = await waveContract.wave("孙子，爷爷又来了")
  await waveTxn.wait();

  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

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