from checkio.signals import ON_CONNECT
from checkio import api
from golf import CheckioRefereeGolf

from tests import TESTS


api.add_listener(
    ON_CONNECT,
    CheckioRefereeGolf(
        max_length=350,
        tests=TESTS,
        function_name="golf"
    ).on_ready)
