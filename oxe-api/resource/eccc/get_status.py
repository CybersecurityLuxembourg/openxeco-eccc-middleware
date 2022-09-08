from flask_apispec import MethodResource
from flask_apispec import doc
from flask_restful import Resource
import requests

from decorator.catch_exception import catch_exception
from config.config import ECCC_API_ENDPOINT, ECCC_API_KEY


class GetStatus(MethodResource, Resource):

    @doc(tags=["eccc"],
         description='Get status of the ECCC API',
         responses={
             "200": {},
         })
    @catch_exception
    def get(self):

        message = "OK"

        try:
            website = f"{ECCC_API_ENDPOINT}/dzefzefezfz?api_key={ECCC_API_KEY}"

            r = requests.head(website, allow_redirects=True)

            if r.status_code != 200:
                message.append(f"The ECCC API returned code {r.status_code}")
        except Exception:
            message = "The ECCC API seems unreachable. Please review the configuration of the middleware API " \
                      "or the network access"

        return message, "200 "