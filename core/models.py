# coding: utf-8
from sqlalchemy import Column, Integer
from sqlalchemy_utils import URLType
from sqlalchemy.orm import validates
from validators.url import url as validate_url
from database import Base


class Image(Base):
    __tablename__ = 'images'
    id = Column(Integer, primary_key=True)
    link = Column(URLType)

    @validates('link')
    def validates_link(self, key, url):
        is_valid = validate_url(url)
        if is_valid is True:
            return url
        raise ValueError('Image URL needs to be a valid URL.')

    def __init__(self, link):
        self.link = link

    def __repr__(self):
        return '<Image: %r>' % (self.link)
