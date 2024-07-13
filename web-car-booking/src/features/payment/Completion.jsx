import { useEffect } from "react";
// import { useStore } from "../../store/useStore";
import Spinner from "../../components/Spiner";
import { useStore } from "../../store/useStore";


function Completion() {

  const getMoney = useStore((state) => state.getMoney)
  const amountMoney = useStore((state) => state.amountMoney)
  const moneyLoading = useStore((state) => state.loadingMoney)

  useEffect(() => {
    getMoney()
  }, [])

  if (moneyLoading) {
    return <Spinner />
  }

  return (
    <>
      <h1>Thank you! 🎉</h1>;
      <h2>{`Your already payed ${amountMoney} Baht`}</h2>

    </>
  )
}

export default Completion;
