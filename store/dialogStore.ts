import { defineStore } from 'pinia'

export const useDialogStore = defineStore('dialog', () => {
  const dialogList = ref<Dialog[]>([])


  const intervalData = {
    intervalNumber : 0
  }

  type Dialog = {
    _deferrer: {
      resolve: (data: ReturnData) => void
    }
  }
  type ReturnData = {}

  const getDialogList = () => dialogList.value

  const pushDialogList = (dialog: Dialog) => {
    dialogList.value.push(dialog)
  }

  const popDialogList = (returnData: ReturnData) => {
    const removedDialog = dialogList.value.pop()
    removedDialog?._deferrer.resolve(returnData)
  }

  const clearDialogs = () => {
    dialogList.value.splice(0, dialogList.value.length)
  }
  const setInterval = (intervalNumber : number )=>{
    intervalData.intervalNumber = intervalNumber
  }

  const isInterval = () =>{
    return !!intervalData.intervalNumber
  }

  const clearIntervalNumber = () =>{
    clearInterval(intervalData?.intervalNumber)
  }

  return {
    getDialogList,
    pushDialogList,
    popDialogList,
    clearDialogs,
    setInterval,
    clearIntervalNumber,
    isInterval
  }
})
