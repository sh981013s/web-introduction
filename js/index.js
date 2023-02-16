
const getCheckboxValue = () => {
  const name = document.querySelector('.form__input').value;

  const query = 'input[name="animal"]:checked';
  const selectedEls =
    document.querySelectorAll(query);

  // 선택된 목록에서 value 찾기
  let result = 0;
  selectedEls.forEach((el) => {
    result++;
})

  pushAlert(name, result);
};

const pushAlert = (name, result) => {
  alert(`${name}님, 저와 ${result}개의 취향이 비슷하시네요!!`);
}


