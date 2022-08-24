import date from "date-and-time"

const hello = (): string => {
  const currentTime = date.format((new Date()), "YYYY/MM/DD HH:mm:ss")

  return `Hello world, the time is currently ${currentTime}`
}

export {
  hello
}
