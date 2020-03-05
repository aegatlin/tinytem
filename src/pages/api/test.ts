export default (req, res) => {
  console.log(process.env.howdy)
  console.log(process.env.HOWDY)
  res.json({ howdy1: process.env.howdy, HOWDY2: process.env.HOWDY })
}
