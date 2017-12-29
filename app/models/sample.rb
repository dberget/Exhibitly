class Sample < ApplicationRecord
  belongs_to :account
  has_many :presentation_samples
  has_many :presentations, through: :presentation_samples 
  serialize :tags, Array

  def self.account_tags(account_id)
    self.where(account_id: account_id).pluck(:tags).flatten
  end

end
