import { useState } from "react"

import { useAppDispatch, useAppSelector } from "../../app/hooks"
import styles from "./Counter.module.css"
import {
  increment,
  selectCount,
} from "./counterSlice"

export const Counter = () => {
  const count = useAppSelector(selectCount)
  const [incrementAmount, setIncrementAmount] = useState("2")

  const incrementValue = Number(incrementAmount) || 0

  return (
    <div>
      <div >
      
      </div>
    </div>
  )
}
