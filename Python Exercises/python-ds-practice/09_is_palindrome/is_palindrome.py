def is_palindrome(phrase):
    """Is phrase a palindrome?

    Return True/False if phrase is a palindrome (same read backwards and
    forwards).

        >>> is_palindrome('tacocat')
        True

        >>> is_palindrome('noon')
        True

        >>> is_palindrome('robert')
        False

    Should ignore capitalization/spaces when deciding:

        >>> is_palindrome('taco cat')
        True

        >>> is_palindrome('Noon')
        True
    """
    lower_case = phrase.lower()
    no_spaces = lower_case.replace(' ', '')
    length = len(no_spaces) - 1
    letters = []
    s = ''
    for num in range(length, -1, -1):
        letters.append(no_spaces[num])
    backwards = s.join(letters)
    if backwards == no_spaces:
        return True
    else:
        return False