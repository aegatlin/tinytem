export default (req, res) => {
  console.log(process.env.howdy)
  res.json({ text: process.env.howdy })
}
