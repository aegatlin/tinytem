export default (req, res) => {
  console.log(process.env.HOWDY)
  res.json({ HOWDY: process.env.HOWDY })
}
