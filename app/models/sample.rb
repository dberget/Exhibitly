class Sample < ApplicationRecord
  belongs_to :account 
  serialize :tags, Array

end
