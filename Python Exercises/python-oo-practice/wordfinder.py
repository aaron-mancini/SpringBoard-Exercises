"""Word Finder: finds random words from a dictionary."""

from random import choice

class WordFinder:
    """Finds words in files by line and can select random word from file
    >>> wf = WordFinder("words.txt")
    235886 words read

    >>> isinstance(wf.random(), str)
    True

    >>> wf.random() in wf.list
    True
    """
    
    def __init__(self, file_path):
        """Open the given file and make a list of lines and return the number of lines read"""
        self.file_path = file_path
        self.list = None
        self.read()
        self.length()

    def read(self):
        """Reads the file and makes a list of lines"""
        file = open(self.file_path, 'r') 
        self.list = [line[:-1] for line in file]

    def length(self):
        """returns the number of lines read"""
        return print(f"{len(self.list)} words read")

    def random(self):
        """picks a random word from the list"""
        return choice(self.list)

class SpecialWordFinder(WordFinder):

    def __init__(self, file_path):
        super().__init__(file_path)

    def read(self):
        file = open(self.file_path, 'r')
        self.list = [line[:-1] for line in file if line[0] != '#' and line[0] != '\n']