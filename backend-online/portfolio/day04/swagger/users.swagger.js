/**
 * @swagger
 * /users:
 *   get:
 *     summary: 회원 목록 조회
 *     tags: [users]
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                      properties:
 *                          email:
 *                              type: string
 *                              example: name@company.com
 *                          name:
 *                              type: string
 *                              example: Anna
 *                          phone:
 *                              type: string
 *                              example: 010-1234-5678
 *                          personal:
 *                              type: string
 *                              example: 123456-000000
 *                          prefer:
 *                              type: string
 *                              example: https://url.com
 */
