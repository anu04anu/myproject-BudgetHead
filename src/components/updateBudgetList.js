const updateBudgetList = {
  
    handleHeadList: function( setHeadList, headName, amount) {
      setHeadList((previous) => ({
        ...previous,
        [headName]: [amount]  // Initialize the new head with an array containing the amount
      }));
    },
  
    handleExpense: function(headList, setHeadList, details) {
      const [headName,...tempdetails] = [...details];
      const ifExist = Object.keys(headList || {}).some((element) => element === headName);
  
      if (ifExist) {
        const date = new Date();
        const currDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        //console.log(headList[headName][1].length)
        const index = headList[headName].length === 1 ? 0 : headList[headName][1].length;
        //console.log(index,tempdetails,'data');
        setHeadList((prevState) => {
          //console.log(prevState, 'exp 123');
          return {...prevState,
                    [headName]: [prevState[headName][0],
            [...(index>0?prevState[headName][1]:[]) , { [index]: [...tempdetails, currDate] }]
          ]}
        });
      }
    },
  
    handleInvoice: function(headList, setHeadList, listValues) {
      const index = listValues[1];
  
      setHeadList((prevState) => {
        //console.log(prevState);
        const { [listValues[0]]: headData, ...otherHeads } = prevState;
        //console.log(headData);
        const [sanctionedAmt, detailsArray] = headData;
        const updatedDetailsArray = detailsArray.map((item) => {
          if (item.hasOwnProperty(index)) {
            return {
              ...item,
              [index]: [...item[index], listValues[2], listValues[3], listValues[4]]
            };
          }
          return item;
        });
  
        return {
          ...otherHeads,
          [listValues[0]]: [sanctionedAmt, updatedDetailsArray]
        };
      });
    }
};
  
export default updateBudgetList;
  