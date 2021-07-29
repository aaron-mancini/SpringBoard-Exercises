def reverse_string(phrase):
    """Reverse string,

        >>> reverse_string('awesome')
        'emosewa'

        >>> reverse_string('sauce')
        'ecuas'
    """
    length = len(phrase) - 1
    letters = []
    s = ''
    for num in range(length, -1, -1):
        letters.append(phrase[num])
    return s.join(letters)
