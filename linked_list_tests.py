class Pair:
    def __init__(self, first, rest):
        self.first = first
        self.rest = rest

    def __eq__(self, other):
        return type(other) == type(self) and self.first == other.first and self.rest == other.rest


    def __repr__(self):
        return "Pair(%r, %r)" %(self.first, self.rest)

#AnyList can have two values
# -either it can have the value None to represent an empty list
# -or it can be a Pair where the first can be any value
# -> None
#this function takes no arguments and returns an empty list
def empty_list():
    return None

#AnyList can have two values
# -either it can have the value None to represent an empty list
# -or it can be a Pair where the first can be any value
#value can be any data type
# AnyList int value-> AnyList
#this function takes an index as an int an AnyList and a value and places that value at the index in the AnyList
def sup_add(AnyList, index, value, count):
    if AnyList == None and index == 0:
        return Pair(value, None)

    elif AnyList.rest == None and index > count:
        raise IndexError('index out of range')

    else:
        if count == index:
            return Pair(value, AnyList)
        else:
            count += 1
            return Pair(AnyList.first, sup_add(AnyList.rest, index, value, count))

def add(AnyList, index, value):
    return sup_add(AnyList, index, value, 0)

#AnyList can have two values
# -either it can have the value None to represent an empty list
# -or it can be a Pair where the first can be any value
#value can be any data type
# AnyList -> int
#this function takes a list of items and returns the amount of items in the list
def sup_length(AnyList, count):
    if AnyList == None:
        return count

    else:
        count += 1
        return sup_length(AnyList.rest, count)

def length(AnyList):
    return sup_length(AnyList, 0)

#AnyList can have two values
# -either it can have the value None to represent an empty list
# -or it can be a Pair where the first can be any value
#value can be any data type
# AnyList int -> int
#this function takes a list of items and an index and returns the item in the list at that index
def sup_get(AnyList, index, count):
    if AnyList == None:
        raise IndexError('index out of range')
    else:
        if count == index:
            return AnyList.first

        else:
            count += 1
            return sup_get(AnyList.rest, index, count)

def get(AnyList, index):
    return sup_get(AnyList, index, 0)


#AnyList can have two values
# -either it can have the value None to represent an empty list
# -or it can be a Pair where the first can be any value
#value can be any data type
# AnyList int anytype -> AnyList
#this function takes a list of items an index and a value of any type and returns a new list where at the given index the value will be put there
def sup_set(AnyList, index, value, count):
    if index > count and AnyList == None:
        raise IndexError('index out of range')

    elif index == count:
        return Pair(value, AnyList.rest)

    else:
        count += 1
        return Pair(AnyList.first, sup_set(AnyList.rest, index, value, count)) 

def set(AnyList, index, value):
    return sup_set(AnyList, index, value, 0)



#AnyList can have two values
# -either it can have the value None to represent an empty list
# -or it can be a Pair where the first can be any value
#value can be any data type
# AnyList int anytype -> AnyList
#this function takes a list of items an index that designates an item to be removed and returns a tuple of the item removed and the resulting list
def sup_remove(AnyList, index):

    if 0 == index:
        return AnyList.rest
    else:
        return Pair(AnyList.first, sup_remove(AnyList.rest, index - 1))

def remove(AnyList, index):
    #print ('list :', AnyList, 'idx :', index)
    if AnyList == None or index < 0:
        raise IndexError
    return (get(AnyList, index), sup_remove(AnyList, index))





##########################################################################
import unittest
from linked_list import *



class TestList(unittest.TestCase):
    def test_Pair_01(self):
        self.assertEqual(Pair(2, None).first, 2)

    def test_Pair_02(self):
        self.assertEqual(Pair(2, None).rest, None)

    def test_repr_01(self):
        self.assertEqual(repr(Pair(2, None)), 'Pair(2, None)')



    def test_empty_list_01(self):
        self.assertEqual(empty_list(), None)

    def test_add_01(self):
        self.assertEqual(add(None, 0, 5), Pair(5, None))

    def test_add_02(self):
        List = Pair(1, Pair(3, Pair(9, None)))
        self.assertEqual(add(List, 1, "hollup"), Pair(1, Pair("hollup", Pair(3, Pair(9, None)))))

    def test_add_03(self):
        self.assertRaises(IndexError, add, Pair(10, Pair(2, Pair(19, None))), 20, 20)
        '''with self.assertRaises(IndexError):
            List = Pair(10, Pair(2, Pair(19, None)))
            add(List, 20, 20)'''

    def test_length_01(self):
        self.assertEqual(length(None), 0)

    def test_length_02(self):
        self.assertEqual(length(Pair(2, Pair(10, Pair(9, None)))), 3)

    def test_get_01(self):
        with self.assertRaises(IndexError):
            get(Pair(1, None), 3)

    def test_get_02(self):
        self.assertEqual(get(Pair(2, Pair(18, Pair(36, None))), 1), 18)

    def test_set_01(self):
        with self.assertRaises(IndexError):
            set(Pair(1, None), 3, 'a')

    def test_set_02(self):
        self.assertEqual(set(Pair(8, Pair(2, Pair(6, None))), 2, 'abc'), Pair(8, Pair(2, Pair('abc', None))))

    def test_remove_01(self):
        self.assertRaises(IndexError, remove, Pair(1, Pair(2, None)), 6)
        '''with self.assertRaises(IndexError):
            print ('made it')
            remove(Pair(1, Pair(2, None)), 6)'''

    def test_remove_02(self):
        self.assertRaises(IndexError, remove, None, -1)
        '''with self.assertRaises(IndexError):
            remove(None, -1)'''

    def test_remove_03(self):
        self.assertRaises(IndexError, remove, Pair(1, None), -20)
        '''with self.assertRaises(IndexError):
            remove(Pair(1, None), -20)'''

    def test_remove_04(self):
        self.assertRaises(IndexError, remove, None, 0)
        '''with self.assertRaises(IndexError):
            remove(None, 0)'''

    def test_remove_05(self):
        self.assertEqual(remove(Pair(3, Pair(5, Pair(2, None))), 1), (5, Pair(3, Pair(2, None))))



if (__name__ == '__main__'):
    unittest.main()





