def flip_case(phrase, to_swap):
    """Flip [to_swap] case each time it appears in phrase.

        >>> flip_case('Aaaahhh', 'a')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'A')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'h')
        'AaaaHHH'

    """
    letters = [to_swap]
    lower_case = to_swap.swapcase()
    letters.append(lower_case)
    output = [letter.swapcase() if letter in letters else letter for letter in phrase]
    return ''.join(output)