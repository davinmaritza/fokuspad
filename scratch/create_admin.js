const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  const email = 'alfarrezald@gmail.com'
  const password = 'AdminTrack2026!'
  const name = 'Davin Maritza (Admin)'
  
  console.log(`Creating/Updating admin account for ${email}...`)
  const hashedPassword = await bcrypt.hash(password, 10)
  
  const admin = await prisma.user.upsert({
    where: { email: email },
    update: {
      password: hashedPassword,
      role: 'ADMIN',
      isActive: true
    },
    create: {
      email: email,
      name: name,
      password: hashedPassword,
      role: 'ADMIN',
      school: 'SMK Demo',
      nis: 'ADMIN_DAVIN',
      isActive: true
    }
  })
  
  console.log('✅ Admin account created successfully!')
  console.log(`Email: ${admin.email}`)
  console.log(`Password: ${password}`)
  console.log(`Role: ${admin.role}`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
