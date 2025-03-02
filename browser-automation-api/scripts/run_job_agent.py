from browser_automation.agents.job_agent import JobAgent
import asyncio

async def main():
    job_agent = JobAgent()
    result = await job_agent.run()
    print(result)

if __name__ == "__main__":
    asyncio.run(main())