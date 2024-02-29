import formsTesting from './forms.spec.js'
import connectDB from '../src/config/db.js'

async function test() {
    await connectDB()
    console.log("Test: Executing test, please await...")
    console.time("testTime")
    try {
        const user = "65cf80ec6e33b39a288dcad9"
        const form = "657b99f6d1e75f854c2e3d3a"
        const instructors = ["656c4ea5ac32b3aab8b2d295", "656c1fbd8aaa1a0c8605988d", "656c1fb98aaa1a0c86059821", "656c1fbe8aaa1a0c860598a2",
            "657b96d7a5531a7353610e88", "656c1fbb8aaa1a0c8605984e", "656c1fbd8aaa1a0c86059896", "657b96d7a5531a7353610e89", "657b96d7a5531a7353610e8a",
            "657b96d7a5531a7353610e8b", "657b96d7a5531a7353610e8c", "656c1fb78aaa1a0c860597e8", "656c1fb78aaa1a0c860597e5", "657b96d7a5531a7353610e8d",
            "657b96d7a5531a7353610e8e", "657b96d7a5531a7353610e8f"]
        const res = await formsTesting(user, form, instructors, 50)
        console.log(res)
    } catch (error) {
        console.log("Failed Test: " + error)
    }
    console.timeEnd("testTime")
}

test();