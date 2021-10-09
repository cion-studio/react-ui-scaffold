import faker from 'faker'

const FAKE_DATA = [...new Array(50)].map((_r, idx)=>{
	return {
		id: idx, 
		name: faker.name.findName(),
		name2: faker.name.findName(),
		name3: faker.name.findName(),
		name4: faker.name.findName(),
		name5: faker.name.findName(),
		name6: faker.name.findName(),
		name7: faker.name.findName(),
		name8: faker.name.findName(),
		name9: faker.name.findName(),
		name10: faker.name.findName(),
	}
})

export default FAKE_DATA
