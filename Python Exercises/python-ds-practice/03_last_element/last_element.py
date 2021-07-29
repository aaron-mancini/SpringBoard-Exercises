def last_element(lst):
    """Return last item in list (None if list is empty.
    
        >>> last_element([1, 2, 3])
        3
        
        >>> last_element([]) is None
        True
    """
    last_index = len(lst) - 1
    if not lst:
        return None
    else:
       return lst[last_index] 