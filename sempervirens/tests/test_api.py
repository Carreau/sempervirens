from __future__ import absolute_import
from sempervirens import sempervirens as sv

def test_has_accepted():
    _pref = False
    assert (sv.has_accepted() == False)
    sv.record_pref(True)
    assert (sv.has_accepted() == True)
