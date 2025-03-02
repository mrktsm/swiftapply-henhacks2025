from setuptools import setup, find_packages

setup(
    name="browser-automation-api",
    version="0.1.0",
    author="Andry Rakotonjanabelo",
    author_email="andry1arthur@gmail.com",
    description="A Python package for automating job applications using a browser agent.",
    packages=find_packages(where="src"),
    package_dir={"": "src"},
    install_requires=[
        "langchain_openai",
        "dotenv",
        "asyncio",
        "requests",  # Add any other dependencies your project requires
    ],
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires='>=3.6',
)