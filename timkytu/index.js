function findUniqueElements() {
  const Array1 = document.getElementById("array1").value;
  const Array2 = document.getElementById("array2").value;

  const mang1 = Array1.split(",").map((item) => item.trim());
  const mang2 = Array2.split(",").map((item) => item.trim());


  if (!Array1.trim() && !Array2.trim()) {
    document.getElementById('result').textContent = "Hãy nhập đầy đủ các mảng";
    return;
}
  let uniqueArray = [];
  for (let item of mang1) {
    if (!mang2.includes(item)) {
      uniqueArray.push(item);
    }
  }
  for (let item of mang2) {
    if (!mang1.includes(item)) {
      uniqueArray.push(item);
    }
  }
  document.getElementById("result").textContent = JSON.stringify(uniqueArray);
}
