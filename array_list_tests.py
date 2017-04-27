import unittest
from array_list import *

def test_gen(lst, numofnones):
    return lst + [None]*numofnones


class TestList(unittest.TestCase):
    def test_repr(self):
        answer = List()
        answer.values = test_gen(['a'], 9)
        answer.size = 1
        self.assertEqual(repr(answer),"List(1, ['a', None, None, None, None, None, None, None, None, None])")

    def test_empty_list_01(self):
        self.assertEqual(empty_list(), List())


    def test_add_01(self):
        answer = List()
        answer.values = test_gen(['a'], 9)
        answer.size = 1
        self.assertEqual(add(List(), 0, 'a'), answer)


    def test_add_02(self):
        lst = List()
        lst.values = test_gen([1, 2, 3], 7)
        lst.size = 3
        with self.assertRaises(IndexError):
            add(lst, 12, 'b')


    def test_add_03(self):
        lst = List()
        lst.values = test_gen([1, 2, 3, 5], 6)
        lst.size = 4
        answer = List()
        answer.values = test_gen([1, 'abc', 2, 3, 5], 5)
        answer.size = 5
        self.assertEqual(add(lst, 1, 'abc'), answer)

    def test_add_04(self):
        lst = List()
        lst.values = [1, 2, 3, 5, 6, 7, 8, 9, 10]
        lst.size = 10
        answer = List()
        answer.values = [1, 2, 3, 'abc', 5, 6, 7, 8, 9, 10, None, None, None, None, None, None, None, None, None, None]
        answer.size = 11
        self.assertEqual(add(lst, 3, 'abc'), answer)

    def test_length_01(self):
        lst = List()
        self.assertEqual(length(lst), 0)

    def test_length_02(self):
        lst = List()
        lst.values = test_gen([1, 2, 3], 7)
        lst.size = 3
        self.assertEqual(length(lst), 3)

    def test_get_03(self):
        lst = List()
        lst.values = test_gen([1, 2, 3], 7)
        lst.size = 3
        with self.assertRaises(IndexError):
            get(lst, -1)

    def test_get_04(self):
        lst = List()
        lst.values = test_gen([1, 2, 3], 7)
        lst.size = 3
        with self.assertRaises(IndexError):
            get(lst, 12)

    def test_get_05(self):
        lst = List()
        lst.values = test_gen(['a', 'b', 'c'], 7)
        lst.size = 3
        self.assertEqual(get(lst, 8), None)
        self.assertEqual(get(lst, 1), 'b')

    def test_set_01(self):
        lst = List()
        lst.values = test_gen(['a', 'b', 'c'], 7)
        lst.size = 3
        with self.assertRaises(IndexError):
            set(lst, 14, 'a')

    def test_set_02(self):
        lst = List()
        lst.values = test_gen(['a', 'b', 'c'], 7)
        lst.size = 3
        answer = List()
        answer.values = test_gen(['a', 2, 'c'], 7)
        answer.size = 3
        self.assertEqual(set(lst, 1, 2), answer)


    def test_remove_01(self):
        self.assertEqual(remove(List(), 0), (None, None))

    def test_remove_02(self):
        lst = List()
        lst.values = test_gen([1, 2, 3, 4], 6) 
        lst.size = 4
        with self.assertRaises(IndexError):
            remove(lst, 7)

    def test_remove_0(self):
        lst = List()
        lst.values = test_gen([1, 2, 3, 4], 6) 
        lst.size = 4
        answer = List()
        answer.values = test_gen([1, 3, 4], 7)
        answer.size = 3
        self.assertEqual(remove(lst, 1), (2, answer))


if (__name__ == '__main__'):
    unittest.main()





