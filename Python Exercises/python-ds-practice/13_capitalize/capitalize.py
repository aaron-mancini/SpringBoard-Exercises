def capitalize(phrase):
    """Capitalize first letter of first word of phrase.

        >>> capitalize('python')
        'Python'

        >>> capitalize('only first word')
        'Only first word'
    """
    return ''.join([letter.upper() if phrase.index(letter) == 0 else letter for letter in phrase])