"""Python serial number generator."""

class SerialGenerator:
    """Machine to create unique incrementing serial numbers.
    
    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """

    def __init__(self, start):
        """Creats a starting id number based on the given start number"""
        self.start = start
        self.count = 0

    def __repr__(self):
        return f"<SerialGenerator start={self.start} next={self.start + self.count}>"

    def generate(self):
        """Adds the counter to the start number and returns the new id number"""
        serial_num = self.start + self.count
        self.count += 1
        return serial_num

    def reset(self):
        """Resets the id number back to the original given number"""
        self.count = 0