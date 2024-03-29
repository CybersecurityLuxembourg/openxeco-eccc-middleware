# pylint: disable=unused-import
# flake8: noqa: F401
from resource.eccc.add_registration import AddRegistration
from resource.eccc.get_registrations import GetRegistrations
from resource.eccc.get_taxonomies import GetTaxonomies
from resource.eccc.update_registration import UpdateRegistration
from resource.eccc.update_registration_status import UpdateRegistrationStatus
from resource.eccc.get_status import GetStatus
from resource.get_endpoints import GetEndpoints
from resource.healthz import Healthz
import inspect
import sys


def set_routes(*args):

    plugins = args[0]

    for res in inspect.getmembers(sys.modules[__name__], inspect.isclass):

        # Build the endpoint

        endpoint = res[1].__module__.replace("resource.", ".", 1).replace(".", "/")

        functions = inspect.getmembers(res[1], predicate=inspect.isfunction)
        http_functions = [f for n, f in functions if n in ["get", "post", "delete", "put"]]

        if len(http_functions) == 0:
            raise Exception(f"No http function found on resource {res[1].__module__}")
        if len(http_functions) > 1:
            raise Exception(f"Too much http functions found on resource {res[1].__module__}")

        function_args = [a for a in inspect.signature(http_functions[0]).parameters if a != "self" and a != "kwargs"]

        if len(function_args) > 1:
            raise Exception(f"Too much args for http function on resource {res[1].__module__}")

        if len(function_args) == 1:
            endpoint += f"/<{function_args[0]}>"

        # Build the args

        class_args = {a: plugins[a] for a in inspect.getfullargspec(res[1]).args if a != "self"}

        # Add the resource

        plugins["api"].add_resource(res[1], endpoint, resource_class_kwargs=class_args)

        # Add the resource in the doc

        plugins["docs"].register(res[1], resource_class_kwargs=class_args)
