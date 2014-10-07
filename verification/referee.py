from checkio.signals import ON_CONNECT
from checkio import api
from golf import CheckioRefereeGolf

from tests import TESTS


cover = """def cover(f, data):
    return f(tuple(tuple(row) for row in data))
"""

api.add_listener(
    ON_CONNECT,
    CheckioRefereeGolf(
        max_length=350,
        tests=TESTS,
        function_name="golf",
        cover_code={
            'python-27': cover,
            'python-3': cover,
        },
    ).on_ready)
