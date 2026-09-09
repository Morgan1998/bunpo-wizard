import app from './app';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Bunpo Wizard server running on http://localhost:${PORT}`);
});
