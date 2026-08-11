import express from 'express';

const router = express.Router();

router.get('/day-meals', (_req, res) => {
  res.json({
    meals: [
      { title: 'Breakfast', description: 'Greek yogurt, berries, and granola' },
      { title: 'Lunch', description: 'Grilled chicken wrap with mixed greens' },
      { title: 'Dinner', description: 'Salmon, quinoa, and roasted vegetables' },
      { title: 'Snack', description: 'Apple slices with almond butter' },
    ],
  });
});

export default router;
