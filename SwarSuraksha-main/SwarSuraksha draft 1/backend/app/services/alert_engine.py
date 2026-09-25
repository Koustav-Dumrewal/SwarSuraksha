def create_alert(
    risk
):

    level = risk["level"]

    if level == "CRITICAL":

        return {
            "title":
                "Potential AI-generated voice",
            "message":
                "Critical impersonation risk detected.",
            "level":
                "CRITICAL"
        }

    if level == "HIGH":

        return {
            "title":
                "Suspicious voice characteristics",
            "message":
                "Voice characteristics require additional verification.",
            "level":
                "HIGH"
        }

    if level == "MEDIUM":

        return {
            "title":
                "Elevated voice risk",
            "message":
                "Continue monitoring the conversation.",
            "level":
                "MEDIUM"
        }

    return None
