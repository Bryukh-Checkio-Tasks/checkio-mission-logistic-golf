"""
TESTS is a dict with all you tests.
Keys for this will be categories' names.
Each test is dict with
    "input" -- input data for user function
    "answer" -- your right answer
    "explanation" -- not necessary key, it's using for additional info in animation.
"""

TESTS = {
    "Basics": [
        {
            "input": [[0, 80, 58, 0], [80, 0, 71, 80], [58, 71, 0, 58], [0, 80, 58, 0]],
            "answer": 116,
            "explanation": [[[1, 1], [1, 9], [6, 4], [9, 9]], (0, 2, 3)]
        },
        {
            "input": [[0, 57, 0, 0, 0], [57, 0, 71, 0, 0], [0, 71, 0, 45, 0], [0, 0, 45, 0, 58],
                      [0, 0, 0, 58, 0]],
            "answer": 231,
            "explanation": [[[5, 5], [1, 1], [2, 8], [6, 6], [9, 1]], (0, 1, 2, 3, 4)]
        },
    ],
    "Extra": [

    ]
}
