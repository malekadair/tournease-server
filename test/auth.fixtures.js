const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


function makeUsersArray() {
	return [
		{
			id: 1,
			user_name: "test-user-1",
			full_name: "Test user 1",
			full_name: "TU1",
			password: '$2y$12$jOGhCuhmLPBzB5jpmSfetO0Ik0LZxHuSM3NrjKL5hhzPG32twwJGK',
			date_created: "2029-01-22T16:28:32.615Z"
		},
		{
			id: 2,
			user_name: "test-user-2",
			full_name: "Test user 2",
			full_name: "TU2",
			password: '$2y$12$TSx.cVRA8XBBsP9/D8yKyuJ1aLB7bKgCKsRHk1ITVytAnTpkesbSi',
			date_created: "2029-01-22T16:28:32.615Z"
		},
		{
			id: 3,
			user_name: "test-user-3",
			full_name: "Test user 3",
			full_name: "TU3",
			password: '$2y$12$tlNORMoOifFwPbh8bdXrFOYqBFiw0iY69uLmKTZYZr/T8n9XDk/VK',
			date_created: "2029-01-22T16:28:32.615Z"
		},
		{
			id: 4,
			user_name: "test-user-4",
			full_name: "Test user 4",
			full_name: "TU4",
			password: '$2y$12$tlNORMoOifFwPbh8bdXrFOYqBFiw0iY69uLmKTZYZr/T8n9XDk/VK',
			date_created: "2029-01-22T16:28:32.615Z"
		}
	];
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
	const token = jwt.sign({ user_id: user.user_id }, secret, {
		subject: user.user_name,
		algorithm: 'HS256',
	})
	return `Bearer ${token}`
}

function seedUsers(db, users) {
	const preppedUsers = users.map(user => ({
		...user,
		password: bcrypt.hashSync(user.password, 1)
	}))
	return db.into('users').insert(preppedUsers)
}

function cleanTables(db) {
	return db.raw(
		`TRUNCATE
		users,
		tournaments
		RESTART IDENTITY CASCADE`
	)
}

module.exports = {
	makeUsersArray,
	makeAuthHeader,
	seedUsers,
	cleanTables
}