import { cronogramsTesting, formsTesting } from './forms.spec.js'
import connectDB from '../src/config/db.js'

async function test() {
    await connectDB()
    console.log("Test: Executing test, please await...")
    console.time("testTime")
    try {
        //const res = await formsTesting(50)
        const res = await cronogramsTesting(6)
    } catch (error) {
        console.log("Failed Test: " + error)
    }
    console.timeEnd("testTime")
}

test();