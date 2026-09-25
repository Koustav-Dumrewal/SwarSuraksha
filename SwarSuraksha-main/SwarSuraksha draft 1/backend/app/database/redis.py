class RedisState:

    def __init__(self):
        self.state = {}

    async def set(
        self,
        key,
        value
    ):
        self.state[key] = value

    async def get(
        self,
        key
    ):
        return self.state.get(key)


redis_state = RedisState()
