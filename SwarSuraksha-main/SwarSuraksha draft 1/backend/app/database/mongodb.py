class MongoDatabase:

    def __init__(self):
        self.enabled = False

    async def save_call(
        self,
        call
    ):
        return call


database = MongoDatabase()
