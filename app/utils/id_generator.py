import time

class IdGenerator:
    def __init__(self):
        self.sequence = 0

    def generate_id(self):
        # Get the current time in milliseconds since the epoch
        current_time = int(time.time() * 1000)

        # Left-shift the timestamp by 22 bits
        timestamp_part = current_time << 22

        # Increment the sequence number (up to 4095)
        self.sequence = (self.sequence + 1) % 4096

        # Combine the timestamp and sequence number
        id = timestamp_part | self.sequence

        return id
